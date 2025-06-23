import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/signup',(c)=>{

});
app.post('/signin',(c)=>{

});
app.post('/blog',(c)=>{

});
app.put('/blog',(c)=>{

});
app.get('/blog:id',(c)=>{

});
app.get('/blog/bulk',(c)=>{

});


export default app
