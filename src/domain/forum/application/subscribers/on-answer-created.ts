import { DomainEvents } from "@/core/events/domain-events";
import { EventHandler } from "@/core/events/event-handler";
import { AnswerCreatedEvent } from "../../enterprise/entities/events/answer-created-event";

export class OnAnswerCreated implements EventHandler {
    constructor(){
        this.setupSubscriptions()
    }
    
    setupSubscriptions(): void {
        // Disparar uma função a partir de um evento

        // bind -> garante que será a referencia da classe necessária
        DomainEvents.register(
            this.sendNewAnswerNotification.bind(this), 
            AnswerCreatedEvent.name
        )
    }

    private async sendNewAnswerNotification ({ answer} : AnswerCreatedEvent){
        console.log(answer)
    }
    
}   