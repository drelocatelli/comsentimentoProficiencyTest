import styled from "styled-components";

export const NoticesWrapper = styled.div`
    border-top: 1px solid #ccc;
    margin: 5vh 0;
    padding: 5vh 0;
`;

export const Container = styled.div`
    ${({ dashboard }) => dashboard ? `
        margin: 10vh auto;
        width: 80%;
        background: #f9f9f9;
        box-shadow: 0px 7px 4px #efefef;
        padding: 20px;
        min-height: 50vh;
    `: `

    ` }
`;