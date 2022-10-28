const captcha = document.querySelector("input[name='code']")

if (captcha) {
    captcha.focus()
    captcha.oninput = () => {
        if (captcha.value.length === 6) {
            const submit = document.querySelector("input[type='submit']")
            submit.click()
        }
    }
}
