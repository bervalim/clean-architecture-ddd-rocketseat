import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";
import { AnswerRepository } from "@/domain/forum/application/repositories/answer-repository";
import { QuestionBestAnswerChosenEvent } from "@/domain/forum/enterprise/entities/events/question-best-answer";

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answerRepository: AnswerRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({ question, bestAnswerId }: QuestionBestAnswerChosenEvent ) {
    const answer = await this.answerRepository.findById(bestAnswerId.toString())

    if(answer) {
        await this.sendNotification.create({
            recipientId: answer.authorId.toString(),
            title: `Sua resposta fpi escolhida`,
            content: `A resposta que você enviou em "${question.title.substring(0, 20)} foi escolhida pelo autor"`
        })
    }

  }
}
