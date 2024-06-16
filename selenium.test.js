require('chromedriver');
const { Builder, By, Key, until } = require('selenium-webdriver');

describe("", () => {
	let driver;

	beforeAll(async() => {
		driver = await new Builder().forBrowser('chrome').build();
		await driver.manage().window().maximize();
	});

	afterAll(async() => {
		await driver.quit();
	});

	const setDelay = async() => {
		await driver.sleep(1000);
	}

	it("open localhost:3000 and get title", async() => {
		await driver.get("http://localhost:3000");
		await driver.getTitle().then(title => {
			expect(title).toEqual("Home");
		});
		await setDelay();
	})

	it("go to contact us page and get title", async() => {
		await driver.get(driver.getCurrentUrl());
		await driver.findElement(By.id('contactLink')).sendKeys(Key.RETURN);
		await driver.getTitle().then(title => {
			expect(title).toEqual("Contact Us");
		});
		await setDelay();
	})

	it("enter email, click submit, get provided message", async() => {
		await driver.get(driver.getCurrentUrl());
		await driver.findElement(By.id('formInput')).sendKeys("example@example.com", Key.RETURN);
		await driver.findElement(By.id('formSubmit')).sendKeys("example@example.com", Key.RETURN);
		const isDisplayed = await driver.findElement(By.id('formMessage')).Displayed;
		if(isDisplayed) {
			expect(driver.findElement(By.id('formMessage'))).contains("More info coming to example@example.com");
		}
		await setDelay();
	})
})