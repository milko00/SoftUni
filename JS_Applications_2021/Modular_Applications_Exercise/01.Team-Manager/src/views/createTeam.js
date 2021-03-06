import { html } from '../../node_modules/lit-html/lit-html.js';
import { createNewTeam } from '../api/data.js';
import {loaderTemplate} from './loader.js';

const createTemplate = (onSubmit, errorMsg) => html`<section id="create">
    <article class="narrow">
        <header class="pad-med">
            <h1>New Team</h1>
        </header>
        <form @submit=${onSubmit} id="create-form" class="main-form pad-large">
            ${errorMsg ? html`<div class="error">${errorMsg}</div>` : ''}
            <label>Team name: <input type="text" name="name"></label>
            <label>Logo URL: <input type="text" name="logoUrl"></label>
            <label>Description: <textarea name="description"></textarea></label>
            <input class="action cta" type="submit" value="Create Team">
        </form>
    </article>
</section>`

export async function createTeam(ctx) {
    ctx.render(createTemplate(onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault();

        ctx.render(loaderTemplate());

        const formData = new FormData(ev.target);
        
        const name = formData.get('name');
        const logoUrl = formData.get('logoUrl');
        const description = formData.get('description');
        
        
        try {
            if (name.length < 4) {
                throw new Error('Team name must be at least 4 characters long.')
            }
            if (logoUrl == '') {
                throw new Error('Team logo is required.')
            }
            if (description.length < 10) {
                throw new Error('Team name must be at least 10 characters long.')
            }

            const team = await createNewTeam({ name, description, logoUrl });
            ev.target.reset();

            ctx.page.redirect('/team-details/' + team._id);

        } catch (err) {
            ctx.render(createTemplate(onSubmit, err.message));
        }
    }
}


