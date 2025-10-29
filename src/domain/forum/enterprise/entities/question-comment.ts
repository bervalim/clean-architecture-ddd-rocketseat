import { UniqueEntityId } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"
import { Comment, CommentProps } from "./comment"

export interface questionCommentProps extends CommentProps  {
  questionId: UniqueEntityId
}


export class QuestionComment extends Comment<questionCommentProps> {

  get questionId(){
    return this.props.questionId
  }

  static create(
    props: Optional<questionCommentProps, "createdAt">,
    id?: UniqueEntityId
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id
    );

    return  questionComment;
  }
}