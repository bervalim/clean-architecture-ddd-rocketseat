import { AggregateRoot } from "../entities/aggregate-root";
import { UniqueEntityId } from "../entities/unique-entity-id";
import { DomainEvent } from "./domain-event";
import { DomainEvents } from "./domain-events";
import { vi } from "vitest";

// Classe que identifica quando o evento foi criado
class CustomAggregateCreated implements DomainEvent{
    public ocurredAt: Date
    private aggregate: CustomAggregate

    constructor(aggreegate: CustomAggregate){
        this.aggregate = aggreegate
        this.ocurredAt = new Date()
    }

    public getAggregateId(): UniqueEntityId {
        return this.aggregate.id
    }
}

// Como se fosse uma entity da aplicação
class CustomAggregate extends AggregateRoot<null> {
    static create(){
        const aggregate = new CustomAggregate(null)
        aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))
        return aggregate
    }
}

describe('domain events', () => {
    it('should be able to dispatch and listen to events', () => {
        const callbackSpy = vi.fn()
        // Subscriver cadastrado (Ouvindo o evento de resposta criada)
        DomainEvents.register
        (
            callbackSpy,
            CustomAggregateCreated.name
        )
        // Criando uma resposta, porém sem salvar no banco
        const aggregate = CustomAggregate.create()

        // Assegurando que o evento foi criado, porém não disparado
        expect(aggregate.domainEvents).toHaveLength(1)

        // Salvando a resposta no banco e disparando o evento
        DomainEvents.dispatchEventsForAggregate(aggregate.id)

        // Subscriver ouve o evento
        expect(callbackSpy).toHaveBeenCalled()
        expect(aggregate.domainEvents).toHaveLength(0)
    })
})