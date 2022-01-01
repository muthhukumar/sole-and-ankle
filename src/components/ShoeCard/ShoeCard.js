import React from 'react'
import styled from 'styled-components/macro'

import {COLORS, WEIGHTS} from '../../constants'
import {formatPrice, pluralize, isNewShoe} from '../../utils'
import Spacer from '../Spacer'

const ShoeCard = ({slug, name, imageSrc, price, salePrice, releaseDate, numOfColors}) => {
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

  const variantString = {
    'on-sale': 'Sale',
    'new-release': 'Just released!',
  }

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
        </ImageWrapper>
        {variant !== 'default' && (
          <SaleVariant variant={variant}>{variantString[variant]}</SaleVariant>
        )}
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {salePrice ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  )
}

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 340px;
`

const Wrapper = styled.article`
  position: relative;
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`

const Image = styled.img`
  width: 100%;
`

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`

const Price = styled.span``

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`

const SaleVariant = styled.p`
  position: absolute;
  right: -8px;
  top: 12px;
  padding: 8px 12px;
  background: ${props => (props.variant === 'new-release' ? COLORS.secondary : COLORS.primary)};
  color: white;
`

export default ShoeCard
