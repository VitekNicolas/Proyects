const clientUrl = "http://localhost:8080/client";
const resultUrl = "http://localhost:8080/result";

var json = {
  status: {
    code: "0",
    msg: "OK",
    credits: "1",
    remaining_credits: "19998",
  },
  model: "general_en",
  score_tag: "P",
  agreement: "AGREEMENT",
  subjectivity: "SUBJECTIVE",
  confidence: "100",
  irony: "NONIRONIC",
  sentence_list: [
    {
      text: "I love this car.",
      inip: "0",
      endp: "15",
      bop: "y",
      confidence: "100",
      score_tag: "P",
      agreement: "AGREEMENT",
      segment_list: [
        {
          text: "I love this car.",
          segment_type: "main",
          inip: "0",
          endp: "15",
          confidence: "100",
          score_tag: "P",
          agreement: "AGREEMENT",
          polarity_term_list: [
            {
              text: "love",
              inip: "2",
              endp: "5",
              confidence: "100",
              score_tag: "P",
              sentimented_entity_list: [
                {
                  form: "car",
                  id: "6fa0e89a58",
                  variant: "car",
                  inip: "10",
                  endp: "12",
                  type: "Top>Product>Machine>Vehicle>Car",
                  score_tag: "P",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const registerClient = async (
  name,
  lastName,
  userName,
  city,
  state,
  zipCode
) => {
  await fetch(clientUrl, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      name: name,
      lastName: lastName,
      userName: userName,
      city: city,
      state: state,
      zipCode: zipCode,
    }),
  })
    .then((httpResponse) => {
      if (httpResponse.ok) {
        return httpResponse.json();
      }
      if (httpResponse.status == 500) {
        deployAlert("El cliente ya fue agregado");
      }
    })
    .then(console.log("Cliente creado"));
};
export const registerResult = async (
  userName,
  scoreTag,
  irony,
  subjectivity,
  agreement,
  confidence
) => {
  await fetch(`${resultUrl}/${userName}`, {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      userName: userName,
      scoreTag: scoreTag,
      irony: irony,
      subjectivity: subjectivity,
      agreement: agreement,
      confidence: confidence,
    }),
  })
    .then((httpResponse) => {
      if (httpResponse.ok) {
        return httpResponse.json();
      }
    })
    .then(console.log("Resultado agregado"));
};

export const analizeText = async (text, callback) => {
  const formdata = new FormData();
  formdata.append("key", "86c2bbd98a3a00d5b15330c4fcdc17a3");
  formdata.append("txt", text);
  formdata.append("lang", "es");
  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  await fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((json) => {
      callback(json);
    })
    .catch((error) => {
      console.error("Error al hacer la solicitud:", error);
    });
};
