import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from 'mongoose';
import Question from './models/questions.js';

await mongoose.connect('mongodb://127.0.0.1:27017/quiz');

const httpServer = createServer();
const io = new Server(httpServer, {
  // options 
});

io.on('connection', async (socket) => {
  // const question = new Question({
  //   question: 'Awesome Post!',
  //   answers: [{
  //     id: 1,
  //     answer: 'True'
  //   },
  //   { 
  //     id: 2,
  //     answer: 'False'
  //   }],
  //   correctAnswer: 1
  // });
  // await question.save();
  socket.on('chat message', (msg) => {
    io.emit('chat message', "xddd");
  }); 
  socket.on('getQuestion', async (msg) => {
    const test = await Question.aggregate([
      {
          $sample: {
              size: 1
          }
      },
      { "$group": { 
        "_id": {
            "_id": "$_id",
            "question": "$question",
            "answers": "$answers"
        }
      }},
  ]).exec()
  console.log(test[0])
    io.emit('getQuestion', test[0]);
  }); 
  console.log('a user connected');
});

httpServer.listen(3000);