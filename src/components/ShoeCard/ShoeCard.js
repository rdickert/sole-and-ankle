import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantStyles = {
    default: {},
    "on-sale": {
      flagColor: COLORS.primary,
      flagText: "Sale!",
    },
    "new-release": {
      flagColor: COLORS.secondary,
      flagText: "Just Released!",
    },
  };
  const isOnSale = variant === "on-sale";
  console.log(variant, variant === "on-sale", isOnSale);

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper variant={variantStyles[variant]}>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--text-decoration": variant === "on-sale" && "line-through",
              "--color": variant === "on-sale" && COLORS.gray[700],
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          <SalePrice hide={variant !== "on-sale"}>
            {formatPrice(salePrice)}
          </SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 340px;
`;

const Wrapper = styled.article`
  position: relative;

  /* This was an interesting experiment. See official solution for an overall better way, though */
  &::before {
    content: "${(p) => p.variant.flagText}";
    position: absolute;
    z-index: 1;
    top: 12px;
    right: -4px;
    background-color: ${(p) => p.variant.flagColor};
    font-family: "Raleway";
    font-size: ${14 / 16}rem;
    color: ${COLORS.white};
    font-weight: 700;
    padding: 8px;
    border-radius: 2px;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1rem;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
  color: var(--color);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  ${(p) => p.hide && "display: none;"}
`;

export default ShoeCard;
