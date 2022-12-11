const { default: axios } = require('axios');
const chromium = require('chrome-aws-lambda');

exports.handler = async (event, _, callback) => {
    let result = null;
    let browser = null;

    try {
        browser = await chromium.puppeteer.launch({
            args: chromium.args,
            // defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        });

        let page = await browser.newPage();

        await page.goto(`https://www.css.app/component/${event.id}/preview`);

        const image = await page.screenshot();
        result = image;
    } catch (error) {
        return callback(error);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }

    return callback(null, result);
};
