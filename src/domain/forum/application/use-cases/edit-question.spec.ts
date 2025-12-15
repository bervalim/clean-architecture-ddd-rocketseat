import { expect, describe, it, beforeEach } from 'vitest';
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository';
import { makeQuestion } from 'test/factories/make-question';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { EditQuestionUseCase } from './edit-question';
import { NotAllowedError } from './errors/not-allowed-error';
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository';
import { makeQuestionAttachment } from 'test/factories/make-question-attachment';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    inMemoryQuestionAttachmentRepository = new InMemoryQuestionAttachmentRepository();
    sut = new EditQuestionUseCase(inMemoryQuestionRepository, inMemoryQuestionAttachmentRepository);
  });

  it('should be able to Edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );
    // Pré-popluando o repo fazendo como s ea pergunta fosse previamente criada com dois anexos

    await inMemoryQuestionRepository.create(newQuestion);
      inMemoryQuestionAttachmentRepository.items.push(
        makeQuestionAttachment({
          questionId: newQuestion.id,
          attachmentId: new UniqueEntityId('1')
        }),
        makeQuestionAttachment({
          questionId: newQuestion.id,
          attachmentId: new UniqueEntityId('2')
        }),
    )

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'title-1',
      content: 'content-1',
      attachmentsIds: ['1', '3']
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
        title: 'title-1',
        content: 'content-1'
    })
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({attachmentId: new UniqueEntityId('1')}),
      expect.objectContaining({attachmentId: new UniqueEntityId('3')})
    ])
   
  });

  it('should not be able to Edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
        authorId: "author-2",
        questionId: newQuestion.id.toValue(),
        title: "title-1",
        content: "content-1",
        attachmentsIds: []
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  });
});
