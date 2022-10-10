import {OrderCreatedEvent, Publisher, Subjects} from "@gilesreece2/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}