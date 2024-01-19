import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsButton extends Schema.Component {
  collectionName: 'components_components_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsEntryField extends Schema.Component {
  collectionName: 'components_components_entry_fields';
  info: {
    displayName: 'entryField';
    description: '';
  };
  attributes: {
    label: Attribute.String & Attribute.Required;
    placeholder: Attribute.String & Attribute.Required;
    type: Attribute.Enumeration<['text', 'email', 'tel', 'password', 'file']> &
      Attribute.Required &
      Attribute.DefaultTo<'text'>;
    forId: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsGalleryItem extends Schema.Component {
  collectionName: 'components_components_gallery_items';
  info: {
    displayName: 'GalleryItem';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    signature: Attribute.String;
  };
}

export interface ComponentsHomeProductItem extends Schema.Component {
  collectionName: 'components_components_home_product_items';
  info: {
    displayName: 'homeProductItem';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    catalogs: Attribute.Relation<
      'components.home-product-item',
      'oneToMany',
      'api::catalog.catalog'
    >;
  };
}

export interface ComponentsImageFour extends Schema.Component {
  collectionName: 'components_components_image_fours';
  info: {
    displayName: 'ImageFour';
    description: '';
  };
  attributes: {
    one: Attribute.Media & Attribute.Required;
    two: Attribute.Media & Attribute.Required;
    three: Attribute.Media & Attribute.Required;
    four: Attribute.Media & Attribute.Required;
  };
}

export interface ComponentsLink extends Schema.Component {
  collectionName: 'components_components_links';
  info: {
    displayName: 'Link';
    description: '';
  };
  attributes: {
    icon: Attribute.Media & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    link: Attribute.String;
    type: Attribute.Enumeration<['tel:', 'mailto:']>;
    iconWhite: Attribute.Media & Attribute.Required;
  };
}

export interface ComponentsLogoWithName extends Schema.Component {
  collectionName: 'components_components_logo_with_names';
  info: {
    displayName: 'LogoWithName';
    description: '';
  };
  attributes: {
    icon: Attribute.Media & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    iconWhite: Attribute.Media & Attribute.Required;
  };
}

export interface ComponentsMultiParagraphAndLink extends Schema.Component {
  collectionName: 'components_components_multi_paragraph_and_links';
  info: {
    displayName: 'MultiParagraphAndLink';
    description: '';
  };
  attributes: {
    textStart: Attribute.Text;
    link: Attribute.String;
    textEnd: Attribute.String;
    removeIndentation: Attribute.Boolean;
  };
}

export interface ComponentsMultiParagraph extends Schema.Component {
  collectionName: 'components_components_multi_paragraphs';
  info: {
    displayName: 'MultiParagraph';
    description: '';
  };
  attributes: {
    paragraph: Attribute.Text & Attribute.Required;
    removeIndentation: Attribute.Boolean;
  };
}

export interface ComponentsMultiTitle extends Schema.Component {
  collectionName: 'components_components_multi_titles';
  info: {
    displayName: 'multiTitle';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsParagraph extends Schema.Component {
  collectionName: 'components_components_paragraphs';
  info: {
    displayName: 'Paragraph';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    paragraph: Attribute.Component<'components.multi-paragraph', true>;
    storiesStyle: Attribute.Boolean;
  };
}

export interface ComponentsProductDescription extends Schema.Component {
  collectionName: 'components_components_product_descriptions';
  info: {
    displayName: 'productDescription';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    value: Attribute.Text & Attribute.Required;
  };
}

export interface ComponentsProduct extends Schema.Component {
  collectionName: 'components_components_products';
  info: {
    displayName: 'Product';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    price: Attribute.BigInteger & Attribute.Required;
    city: Attribute.String & Attribute.Required;
    purpose: Attribute.Text & Attribute.Required;
    size: Attribute.String & Attribute.Required;
    frame: Attribute.String & Attribute.Required;
    year: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsShopBlock extends Schema.Component {
  collectionName: 'components_components_shop_blocks';
  info: {
    displayName: 'ShopBlock';
    description: '';
  };
  attributes: {
    paragraph: Attribute.Component<'components.multi-paragraph', true>;
    image: Attribute.Media & Attribute.Required;
    subParagraph: Attribute.Component<'components.multi-paragraph', true>;
    title: Attribute.String & Attribute.Required;
  };
}

export interface ComponentsTitleColorful extends Schema.Component {
  collectionName: 'components_components_title_colorfuls';
  info: {
    displayName: 'TitleColored';
    description: '';
  };
  attributes: {
    titleStart: Attribute.String;
    titleColored: Attribute.String;
    titleEnd: Attribute.String;
  };
}

export interface SectionsArticleBlock extends Schema.Component {
  collectionName: 'components_sections_article_blocks';
  info: {
    displayName: 'ArticleBlock';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    paragraph: Attribute.Component<'components.paragraph', true>;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface SectionsBlockTextAndLink extends Schema.Component {
  collectionName: 'components_sections_block_text_and_links';
  info: {
    displayName: 'BlockTextAndLink';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    title: Attribute.String & Attribute.Required;
    list: Attribute.Component<'components.multi-paragraph-and-link', true>;
    description: Attribute.Component<'components.multi-paragraph', true>;
  };
}

export interface SectionsBlockTextOne extends Schema.Component {
  collectionName: 'components_sections_block_text_ones';
  info: {
    displayName: 'BlockTextOne';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    image: Attribute.Media & Attribute.Required;
    description: Attribute.Component<'components.multi-paragraph', true> &
      Attribute.Required;
    title: Attribute.Component<'components.title-colorful'> &
      Attribute.Required;
  };
}

export interface SectionsBlockTextThree extends Schema.Component {
  collectionName: 'components_sections_block_text_threes';
  info: {
    displayName: 'blockTextThree';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    list: Attribute.Component<'components.multi-paragraph', true> &
      Attribute.Required;
    paragraph: Attribute.Component<'components.multi-paragraph', true> &
      Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface SectionsBlockTextTwo extends Schema.Component {
  collectionName: 'components_sections_block_text_twos';
  info: {
    displayName: 'BlockTextTwo';
    description: '';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    name: Attribute.String;
    title: Attribute.String & Attribute.Required;
    description: Attribute.Component<'components.multi-paragraph', true> &
      Attribute.Required;
    button: Attribute.Component<'components.button'>;
  };
}

export interface SectionsBlockText extends Schema.Component {
  collectionName: 'components_sections_block_texts';
  info: {
    displayName: 'BlockText';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    button: Attribute.Component<'components.button'> & Attribute.Required;
    title: Attribute.Component<'components.multi-title', true> &
      Attribute.Required;
    description: Attribute.Component<'components.multi-paragraph', true>;
  };
}

export interface SectionsBloxImageOne extends Schema.Component {
  collectionName: 'components_sections_blox_image_ones';
  info: {
    displayName: 'blockImageOne';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    infoTop: Attribute.Component<'components.multi-paragraph', true>;
    images: Attribute.Component<'components.image-four'> & Attribute.Required;
    infoBottom: Attribute.Component<'components.multi-paragraph', true>;
  };
}

export interface SectionsFeedback extends Schema.Component {
  collectionName: 'components_sections_feedbacks';
  info: {
    displayName: 'Feedback';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    title: Attribute.String & Attribute.Required;
    input: Attribute.Component<'components.entry-field', true> &
      Attribute.Required;
    button: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface SectionsGalleryBlock extends Schema.Component {
  collectionName: 'components_sections_gallery_blocks';
  info: {
    displayName: 'GalleryBlock';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    gallery: Attribute.Relation<
      'sections.gallery-block',
      'oneToOne',
      'api::gallery.gallery'
    >;
    description: Attribute.Component<'components.multi-paragraph', true>;
    subTitle: Attribute.String;
  };
}

export interface SectionsGallery extends Schema.Component {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'Gallery';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    gallery: Attribute.Relation<
      'sections.gallery',
      'oneToOne',
      'api::gallery.gallery'
    >;
    button: Attribute.Component<'components.button'> & Attribute.Required;
  };
}

export interface SectionsHomeProductList extends Schema.Component {
  collectionName: 'components_sections_home_product_lists';
  info: {
    displayName: 'HomeProductList';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    productItem: Attribute.Component<'components.home-product-item', true> &
      Attribute.Required;
  };
}

export interface SectionsMainScreen extends Schema.Component {
  collectionName: 'components_sections_main_screens';
  info: {
    displayName: 'MainScreen';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    background: Attribute.Media & Attribute.Required;
    title: Attribute.Component<'components.title-colorful'>;
    decoration: Attribute.Media;
  };
}

export interface SectionsPoemBlock extends Schema.Component {
  collectionName: 'components_sections_poem_blocks';
  info: {
    displayName: 'PoemBlock';
  };
  attributes: {
    image: Attribute.Media & Attribute.Required;
    poemLine: Attribute.Component<'components.multi-paragraph', true> &
      Attribute.Required;
    button: Attribute.Component<'components.button'> & Attribute.Required;
  };
}

export interface SectionsPoemExtended extends Schema.Component {
  collectionName: 'components_sections_poem_extendeds';
  info: {
    displayName: 'PoemExtended';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    titleTwo: Attribute.String;
    poemItem: Attribute.Component<'components.multi-paragraph', true> &
      Attribute.Required;
  };
}

export interface SectionsPoemsList extends Schema.Component {
  collectionName: 'components_sections_poems_lists';
  info: {
    displayName: 'PoemsList';
    description: '';
  };
  attributes: {
    supText: Attribute.Component<'components.multi-paragraph', true>;
    title: Attribute.String;
    subText: Attribute.Component<'components.multi-paragraph', true>;
    poems: Attribute.Relation<
      'sections.poems-list',
      'oneToMany',
      'api::poem.poem'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.button': ComponentsButton;
      'components.entry-field': ComponentsEntryField;
      'components.gallery-item': ComponentsGalleryItem;
      'components.home-product-item': ComponentsHomeProductItem;
      'components.image-four': ComponentsImageFour;
      'components.link': ComponentsLink;
      'components.logo-with-name': ComponentsLogoWithName;
      'components.multi-paragraph-and-link': ComponentsMultiParagraphAndLink;
      'components.multi-paragraph': ComponentsMultiParagraph;
      'components.multi-title': ComponentsMultiTitle;
      'components.paragraph': ComponentsParagraph;
      'components.product-description': ComponentsProductDescription;
      'components.product': ComponentsProduct;
      'components.shop-block': ComponentsShopBlock;
      'components.title-colorful': ComponentsTitleColorful;
      'sections.article-block': SectionsArticleBlock;
      'sections.block-text-and-link': SectionsBlockTextAndLink;
      'sections.block-text-one': SectionsBlockTextOne;
      'sections.block-text-three': SectionsBlockTextThree;
      'sections.block-text-two': SectionsBlockTextTwo;
      'sections.block-text': SectionsBlockText;
      'sections.blox-image-one': SectionsBloxImageOne;
      'sections.feedback': SectionsFeedback;
      'sections.gallery-block': SectionsGalleryBlock;
      'sections.gallery': SectionsGallery;
      'sections.home-product-list': SectionsHomeProductList;
      'sections.main-screen': SectionsMainScreen;
      'sections.poem-block': SectionsPoemBlock;
      'sections.poem-extended': SectionsPoemExtended;
      'sections.poems-list': SectionsPoemsList;
    }
  }
}
