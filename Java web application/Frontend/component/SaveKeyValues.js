import { KeyValuesInStorage } from "./KeyValuesInStorage.js";

export class SaveKeyValues {
    static execute(values) {
        localStorage.setItem("valores", JSON.stringify(new KeyValuesInStorage(values.score_tag, values.irony, values.subjectivity, values.agreement, values.confidence)));
    }
}