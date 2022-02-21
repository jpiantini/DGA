import React, { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { UpdateAppSubHeaderTitle } from "../../redux/actions/UiActions";
import { WpRichTextContainer } from "../../theme/Styles";
import parse from "html-react-parser";
import { useQuery } from "react-query";
import { getPolicyAndPrivacyDataFromWordpress } from "../../api/PolicyPrivacy";

export const PolicyPrivacy = () => {

  const dispatch = useDispatch();
  const { data } = useQuery(['policyPrivacyInformation'], () => getPolicyAndPrivacyDataFromWordpress())


  useLayoutEffect(() => {
    //UPDATE APP HEADER SUBTITLE
    dispatch(UpdateAppSubHeaderTitle("Políticas de privacidad")); // TITLE OF SUBHEADER APP
  }, []);



  return (
    <div>
      {" "}
      {/*<Title>TERMINOS Y CONDICIONES</Title>*/}
      <WpRichTextContainer>
        {data && parse(data.content)}
      </WpRichTextContainer>
    </div>
  );
};
