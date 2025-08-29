export default function handler(req, res) {
  if (req.method === "POST") {
    const { data } = req.body;

  
    const FULL_NAME = "tanu tripathi";     
    const DOB = "18102002";               
    const EMAIL = "tanu.tripathi2022@vitstudent.ac.in";
    const ROLL_NO = "22BCE2412";

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let number_sum = 0;
    let concat_alpha = "";

    // Helper functions
    function isNumber(str) {
      return typeof str === 'string' && /^\d+$/.test(str);
    }
    function isAlphabet(str) {
      return typeof str === 'string' && /^[a-zA-Z]+$/.test(str);
    }

    if (!Array.isArray(data)) {
      res.status(200).json({
        is_success: false,
        user_id: `${FULL_NAME.replace(/ /g, "_")}_${DOB}`,
        email: EMAIL,
        roll_number: ROLL_NO,
        message: "Input data must be an array"
      });
      return;
    }

    data.forEach(item => {
      if (isNumber(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item);
        else odd_numbers.push(item);
        number_sum += num;
      }
      else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
        concat_alpha += item;
      }
      else {
        special_characters.push(item);
      }
    });

    function toAltCapsReverse(str) {
      let arr = str.split('').reverse();
      return arr.map((ch, i) =>
        i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()
      ).join('');
    }
    const concat_string = toAltCapsReverse(concat_alpha);

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME.replace(/ /g, "_")}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NO,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: number_sum.toString(),
      concat_string
    });
  } else {
    res.status(404).json({ error: "Not found" });
  }
}
