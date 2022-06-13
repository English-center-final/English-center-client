export const handleAnswer = (answers) => {
  const map = new Map();

  answers.forEach((answer) => {
    let stt = answer.stt;
    let selected = answer.selected;

    map.set(stt, selected);
  });

  const obj = Object.fromEntries(map);
  return obj;
};
