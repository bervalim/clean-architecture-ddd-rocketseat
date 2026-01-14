import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "../../../forum/enterprise/entities/events/answer-created-event";
import { QuestionRepository } from "../../../forum/application/repositories/questions-repository";
import { SendNotificationUseCase } from "@/domain/notification/application/use-cases/send-notification";

export class OnAnswerCreated implements EventHandler {
  constructor(
    private questionsRepository: QuestionRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewAnswerNotification.bind(this),
      AnswerCreatedEvent.name,
    )
  }

  private async sendNewAnswerNotification({ answer }: AnswerCreatedEvent) {
    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if(question) {
        await this.sendNotification.create({
            recipientId: question?.authorId.toString(),
            title: `Nova resposta em "${question.title.substring(0,40).concat('...')}"`,
            content: answer.excerpt
        })
    }

  }
}
