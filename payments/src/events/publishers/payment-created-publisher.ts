import { Subjects, Publisher, PaymentCreatedEvent } from "@gilesreece2/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}

