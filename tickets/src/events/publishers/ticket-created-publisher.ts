import {Publisher, Subjects, TicketCreatedEvent} from "@gilesreece2/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
