import {ExpirationCompleteEvent, Publisher, Subjects} from "@gilesreece2/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}