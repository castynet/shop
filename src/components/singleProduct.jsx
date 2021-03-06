import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useApi } from "./productsContext";
import Loading from "./loading";
import ReactMarkdown from "react-markdown";
import { Redirect } from "react-router-dom";

export default function (data) {
  const api = useApi();
  const [product, setProduct] = useState();

  const slug = data.match.params.slug;
  const singleProduct = api.products.find((obj) => obj.slug === slug);

  useEffect(() => {
    setProduct(singleProduct);
  }, [singleProduct]); 

  if (api.products.length !== 0 && (!data || singleProduct === undefined)) {
    return <Redirect to={{ pathname: "/ooh-no" }} />;
  }

  const ProductInfo = () => (product === undefined ? <Loading /> : <MP />);

  function MP() {
    return (
      <>
        <Wrapper>
          <TitleWrap>
            <Title>{product.Title}</Title>
          </TitleWrap>

          <MainWrap>
            <ImageWrap>
              <Rating great={product.ShouldBuy}>Buyer's Rating - {product.BuyersScore}/10</Rating>
              <ProductImage>
                <Image
                  src={"https://shop.api.genztech.xyz" + product.Image.path}
                  alt={product.Description}
                />
              </ProductImage>
            </ImageWrap>

            <Details>
              <ContentSection>
                <h3>Description</h3>
                <p>{product.Description}</p>
              </ContentSection>
              <ContentSection>
                <h3>Spec</h3>
                <div>
                  <ReactMarkdown source={product.Spec} />
                </div>
              </ContentSection>

              <ShopWrap content={product.JumiaLink}>
                <a href={product.JumiaLink}>KSh {product.JumiaPrice} - Buy on Jumia</a>
              </ShopWrap>

              <ShopWrap content={product.KilimallLink}>
                <a href={product.KilimallLink}>KSh {product.KilimallPrice} - Buy on Kilimall</a>
              </ShopWrap>

              <ShopWrap content={product.OtherLinkAddress}>
                <a href={product.OtherLinkAddress}>
                  KSh {product.OtherPrice} - Buy on {product.OtherTitle}
                </a>
              </ShopWrap>

              <Button
                content={product.ReviewLink}
                href={product.ReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Review [new-tab]"
                title="Review [new-tab]"
              >
                See Detailed Review
              </Button>
            </Details>
          </MainWrap>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <ProductInfo />
    </>
  );
}

const Show = (content) => (content === "" ? "none" : "block");

const handleBgColor = (great) => {
  return great ? "var(--green)" : "var(--error-red)";
};

const ImageWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ShopWrap = styled.div`
  display: ${({ content }) => Show(content)};

  a {
    padding: 8px 10px;
    display: block;
    width: fit-content;
    margin: 10px;
    border-radius: 4px;
    transition: box-shadow 0.2s, background-color 0.8s;
    background: linear-gradient(
      90deg,
      rgba(255, 145, 0, 0.1) 0%,
      rgba(255, 85, 0, 0.1) 25%,
      rgba(255, 0, 95, 0.1) 50%,
      rgba(255, 0, 228, 0.1) 75%,
      rgba(248, 0, 255, 0.1) 100%
    );
    color: #000;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.95em;
    letter-spacing: 1px;
    border: 1px solid var(--purple);

    &:hover {
      background: linear-gradient(
        90deg,
        rgba(248, 0, 255, 0.2) 0%,
        rgba(255, 0, 228, 0.2) 25%,
        rgba(255, 0, 95, 0.2) 50%,
        rgba(255, 85, 0, 0.2) 75%,
        rgba(255, 145, 0, 0.2) 100%
      );
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
    }
  }
`;

const Button = styled.a`
  display: ${({ content }) => Show(content)};
  padding: 8px 10px;
  background-color: var(--purple);
  color: var(--white);
  width: fit-content;
  margin: 10px;
  border-radius: 4px;
  transition: box-shadow 0.2s, background-color 0.5s;
  text-transform: uppercase;
  font-size: 0.95em;
  letter-spacing: 1px;

  &:hover {
    background-color: var(--blue);
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
`;

const Rating = styled.p`
  border: 1px solid #000;
  padding: 7px 10px;
  margin: 10px 0 0 10px;
  width: fit-content;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 0.95em;
  background-color: ${({ great }) => handleBgColor(great)};
  color: var(--white);
  letter-spacing: 1px;
`;

const ContentSection = styled.div`
  padding: 10px 25px;

  p {
    text-align: justify;
  }
`;

const Image = styled.img`
  width: 100%;
`;

const ProductImage = styled.div`
  padding: 15px;
  width: 350px;
  border-radius: 5px;
  margin: 15px;
  background-color: rgb(156 39 176 / 0.1);
`;

const Details = styled.div`
  width: 65%;
  width: 500px;
`;

const Title = styled.h2`
  text-align: center;
  text-decoration: underline;
`;

const TitleWrap = styled.div`
  padding: 30px 10px;
  margin-top: 20px;
  color: var(--cs-deep-blue);
  border-top: solid 1px var(--light-purple);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MainWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 50px;
  margin: 0 0 20px;
  border-bottom: solid 1px var(--light-purple);
  padding-bottom: 20px;
`;

const Wrapper = styled.div`
  width: 96%;
  margin: 0 auto;
  background-color: rgb(250 250 255 / 0.95);
`;
