import { html } from '../../node_modules/lit-html/lit-html.js'
import { register } from '../api/data.js';
import { notification } from '../common/notifications.js'


const template = (onSubmit, notification) => html`
<section id="register">
    <form @submit=${onSubmit} id="register-form">
        <div class="container">
            ${notification}
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>

        </div>
    </form>
</section>`

export async function registerPage(ctx) {
    ctx.render(template(onSubmit));
    
    async function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(ev.target);

        const username = formData.get('username');
        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPass = formData.get('repeatPass');
        const gender = formData.get('gender');
       

        try {
            if (username == '') {
                throw new Error('All fields are required!');
            }
            if (email == '') {
                throw new Error('All fields are required!');
            }
            if (password == '') {
                throw new Error('All fields are required!');
            }
            if (repeatPass != password) {
                throw new Error('Password don\'t match!');
            }

            await register(
                username,
                email,
                password,
                gender
            )

            ctx.setUserNav();
            ctx.page.redirect('/login');

        } catch (err) {
            ctx.render(template(onSubmit, notification(err)))
        } 


    }

}