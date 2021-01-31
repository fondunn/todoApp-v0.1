import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const items = ['Welcome', 'its a to do list', 'delete default from list'];

const workItems = []; 

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
    

    res.render('list', { listTitle : day, newListItems: items });

    app.post('/', (req,res) => {
        const item = req.body.newItem;

        if(req.body.list === 'Work'){
            workItems.push(item);
            res.redirect('/work');
        } else {
            items.push(item); 
            res.redirect('/');
        }

        
    });
    app.get('/work', (req,res) => {
        res.render('list', {listTitle: 'Work List', newListItems: workItems});
    });
    app.post('/work', (req,res) => {
         const item = req.body.newItem;
         workItems.push(item);
         res.redirect('/work');
    });
 
});

app.listen(3000, () => { 
    console.log('listen:3000')
});




// conts popitem = req.body.delItem;
// items.pop(popitem);