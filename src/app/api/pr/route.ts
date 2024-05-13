import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export async function POST(res: NextRequest, req: NextRequest) {
  try {
    const data1 = await res.json();

    var data = new FormData();
    var key =
      "cWsqgH7JSEO0jtcJR1wbVB%2FGvUVZ9FAAVD0zW7d%2F%2B4%2FS8lZH%2B%2FKWNjmZDiPazFJ7hNAUHG3N4NVw3ULk23ieUtTmXh7zDTcXMoaBzM%2F00z3F1kWE13adWchUp%2Bs45AHx"; // ADD API KEY HERE
    var api_endpoint = "https://api.speechace.co";
    data.append("text", "apple");
    data.append("user_audio_file", fs.createReadStream("./apple.wav"));
    data.append("question_info", "'u1/q1'");

    var config = {
      method: "post",
      url:
        api_endpoint +
        "/api/scoring/text/v9/json?key=" +
        key +
        "&dialect=en-us&user_id=XYZ-ABC-99001",
      headers: {
        ...data.getHeaders(),
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });

    return Response.json(data);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
