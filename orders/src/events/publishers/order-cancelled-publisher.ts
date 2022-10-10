import {OrderCancelledEvent, Publisher, Subjects} from "@gilesreece2/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}