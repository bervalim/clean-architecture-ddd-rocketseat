import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface AttachementProps {
    title: string
    link: string
}

export class Attachement extends Entity<AttachementProps> {

    get title() {
        return this.props.title
    }

    get link() {
        return this.props.link
    }

    static create(props: AttachementProps, id?: UniqueEntityId){
        const attachment = new Attachement(props, id)
        return attachment
    }
}