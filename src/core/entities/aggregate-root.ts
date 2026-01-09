import { DomainEvent } from "../events/domain-event";
import { DomainEvents } from "../events/domain-events";
import { Entity } from "./entity";

export abstract class AggregateRoot<Props> extends Entity<Props> {
    private _domainEvents: DomainEvent[] = []

    get domainEvents(): DomainEvent[] {
        return this._domainEvents
    }

    // Pré disparar os eventos
    // Evento será anotado
    protected addDomainEvent(domainEvent: DomainEvent): void {
        this._domainEvents.push(domainEvent)
        DomainEvents.markAggregateForDispatch(this)
    }

    public clearEvents(){
        this._domainEvents = []
    }
}