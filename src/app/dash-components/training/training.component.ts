import { Component,ViewChild } from '@angular/core';
import {QuizService } from '../../shared/quiz.service';
import { QuizComponent } from '../../quiz/quiz/quiz.component';
import { ResultComponent } from '../../quiz/result/result.component';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent {
   public questionsLimit : number;
  public difficulty : string;

  public showMainMenu : boolean;
  public showQuizScreen : boolean;
  public showResultScreen : boolean;

  public spinner : boolean;

  @ViewChild('quiz',{static:true}) quiz! : QuizComponent;
  @ViewChild('result',{static:true}) result! : ResultComponent;

  constructor(private quizService:QuizService){
    this.questionsLimit = 10;
    this.difficulty = "Easy"
    this.showMainMenu = true;
  }

  quizQuestions(): void{
    this.toggleSpinner();
    this.quizService.getQuizQuestions(this.difficulty,this.questionsLimit)
    .subscribe((response)=>{
      this.quiz.questions = response;
      this.quiz.reset();
      this.quiz.showQuestion(0);
      this.showMainMenu = false;
      this.showQuizScreen = true;
      this.toggleSpinner();
    });
  }

  finalResult(result:any):void{
    this.result.finalResult = result;
    this.showQuizScreen = false;
    this.showResultScreen = true;
  }

  showMainMenuScreen(event:any):void{
    this.showResultScreen = false;
    this.showMainMenu = true;
  }

  toggleSpinner(){
    this.spinner = !this.spinner;
  }
}
