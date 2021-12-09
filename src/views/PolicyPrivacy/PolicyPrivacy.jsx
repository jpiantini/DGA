import React, { useState, useEffect, useLayoutEffect } from "react";
import wpCall from "../../services/WpServerCall";
import { useDispatch } from "react-redux";
import { UpdateAppSubHeaderTitle } from "../../redux/actions/UiActions";
import { WpRichTextContainer } from "../../theme/Styles";
import parse from "html-react-parser";
export const PolicyPrivacy = () => {
  const dispatch = useDispatch();
  const [wordpressContent, setWordpressContent] = useState();

  const getAndSetAllWordPressContent = async () => {
    let data = await wpCall().get("/pages/v1/page/politica-privacidad");
    setWordpressContent(data?.data?.content);
  };

  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle("Políticas de privacidad")); // TITLE OF SUBHEADER APP
  }, []);

  useEffect(() => {
    getAndSetAllWordPressContent();
  }, []);

  console.log(wordpressContent);

  return (
    <div>
      {" "}
      {/*<Title>TERMINOS Y CONDICIONES</Title>*/}
      <WpRichTextContainer>
        {wordpressContent && parse(wordpressContent)}
      </WpRichTextContainer>
    </div>
  );
};
