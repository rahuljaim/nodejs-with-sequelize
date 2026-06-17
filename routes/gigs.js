const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../modals/Gig');

router.get('/', (req, res) => {
    Gig.findAll({ raw: true })
        .then(gigs => { res.render('gigs', { gigs }); })
        .catch(err => res.status(400).json(err));
});

router.get('/add', (req, res) => {
    const data = {
        title: 'Second test title',
        technologies: 'Reactjs, Redux,Node, Express, MongoDB',
        description: 'This is a second test description. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh.',
        budget: '$2000',
        contact_email: 'hello@rahuljain.dev'
    };

    //insert into table
    Gig.create({
        title: data.title,
        technologies: data.technologies,
        description: data.description,
        budget: data.budget,
        contact_email: data.contact_email
    })
        .then(gig => res.redirect(`/gigs/${gig.id}`))
        .catch(err => res.status(400).json(err));
});

module.exports = router;