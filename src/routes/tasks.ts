import { Router, Request, Response } from "express";
import { Task } from "../models/tasks";
const router = Router();
let tasks:  Task[] = [];


router.post('/', (req: Request, res :  Response) =>{
    const task : Task = {
        id: tasks.length +1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    }
    tasks.push(task); 
    res.status(201).json(task); //202 Accepted
})

router.get('/',( req : Request, res : Response) =>{
    res.json(tasks);
});

router.get('/:id', (req: Request, res : Response) =>{
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if(!task){
        res.status(404).send('Non trovato');

    } else { 
        res.json(task);
    }
});



router.put('/:id', (req: Request, res: Response) => {
  
    const foundtask = tasks.find((t) => t.id === parseInt(req.params.id));
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if(!foundtask){
        res.status(404).send('Non trovato');
    } else {
        const task : Task = {
        id: parseInt(req.params.id),
        title : req.body.title,
        description: req.body.description,
        completed : req.body.completed,
    }
        tasks[index] = task;
        res.status(201).json(task);
    }
        

    })

router.delete('/:id', (req: Request , res : Response) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1){
        res.status(404).send('Non trovato');
    }
    else{
        tasks.splice(index,1);
        res.status(204).send();
    }
})
export default router;
