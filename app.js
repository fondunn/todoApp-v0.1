import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const items = ['Welcome', 'its a to do list', 'delete default from list'];

app.set('view engine', 'ejs'); 

app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static('public'));

app.get('/', (req,res) => {

    const today = new Date();
    
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
    };
    const day = today.toLocaleDateString('en-US', options);
    

    res.render('list', { kindOfDay: day, newListItems: items });

    app.post('/', (req,res) => {
        const item = req.body.newItem;
        if (item != '') {
        items.push(item);
        
        res.redirect('/');
        } else {
            console.log('err');
        }
    });
 
});

app.listen(3000, () => { 
    console.log('listen:3000')
});




// conts popitem = req.body.delItem;
// items.pop(popitem);