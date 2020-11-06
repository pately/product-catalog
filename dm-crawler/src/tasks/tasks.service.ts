import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import * as Nightmare from "nightmare";
import * as cheerio from 'cheerio';
import { parseStringPromise } from 'xml2js';
import { DmProductsService } from '../dm-products/dm-products.service'

@Injectable()
export class TasksService {
    private readonly logger = new Logger(TasksService.name);

    constructor(private readonly dmProductsService: DmProductsService) { };

    @Cron('41 15 * * *')
    async handleCron() {
        this.logger.debug('Called when the current second is 45');
        await this.getAndSaveAllDmProductsInfo();
    }

    async sendGetRequest() {
        try {
            const resp = await axios.get('https://products.dm.de/productfeed/de/sitemap.xml');
            const convert = await parseStringPromise(resp.data);
            return (JSON.parse(JSON.stringify(convert, null, 2)));
        } catch (err) {
            console.error(err);
        }
    };

    async getAndSaveAllDmProductsInfo() {
        console.log('--------------------------------', 1)
        const dmSiteMaplist = await this.sendGetRequest();
        console.log('--------------------------------', 2)
        // const url = 'https://www.dm.de/dr-bronners-lippenbalsam-zitrone-limette-p1018787830238.html';
        const products = dmSiteMaplist.urlset.url;
        console.log(products);
        for await (const [index, element] of products.entries()) {
            console.log('--------------------------------', index, element)
            // if (index < 200)
             {
                try {
                    const url = element.loc[0];
                    const productInfo = await this.fetchDmProductInfo(url);
                    await this.dmProductsService.upsert(productInfo);
                } catch (error) {
                    this.logger.error(error);
                }
            }
        }
    }

    async fetchDmProductInfo(url: string) {
        const nightmare = new Nightmare({
            show: false,
            loadImages: false,
            ignoreDownloads: true,
        })
        const promiseme = await nightmare
            .goto(url).evaluate(function () {
                //here is where I want to return the html 
                return document.documentElement.innerHTML

            })
            .end()
            .then((body: any) => {
                const $ = cheerio.load(body);

                const digit = $('[data-dmid="price-digit"]').text()
                console.log(digit);

                const cent = $('[data-dmid="price-cent"]').text()
                console.log(cent);

                const currency = $('[data-dmid="price-currency"]').text()
                console.log(currency);


                const images = [...new Set(($('img').map(function () {
                    let image = $(this).attr('src');
                    console.log(image);
                    image = image.replace(/productimage_60x60/i, 'productimage_280x430');

                    if (image.includes('productimage_280x430')) {
                        return image;
                    }
                }).get()))]
                console.log(images);

                const brand = $('[data-dmid="detail-page-headline-brand-name"]').text()
                console.log(brand);


                const product = $('[data-dmid="detail-page-headline-product-title"]').text()
                console.log(product);


                const base = $('[data-dmid="product-base-price"]').first().text()

                console.log(base);


                const selling = $('[data-dmid="description-relevant-selling-points"]').text()
                console.log(selling);

                const produktbeschreibung = $('[data-dmid="description-relevant-selling-points"] li').map(function (i, elm) {
                    const li = $(this).text();
                    return li;
                }).get()

                console.log(produktbeschreibung);
                return {
                    digit,
                    cent,
                    currency,
                    images,
                    produktbeschreibung,
                    base,
                    product,
                    brand,
                    selling,
                    url
                }

            })
        const productInfo = await promiseme;
        console.log('####################################');
        console.log(productInfo);
        return productInfo;
    }
}