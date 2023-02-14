# atelier-muon



# overview-component description:

The overview component consists of a parent div enclosing four sub components that render the complete component. The parent component consists of many states that trigger sub component re-renders. The sub components are also passed down different methods that allow for customer interaction.

Image Gallery:

The image gallery sub component renders a centered 'main stage' image of a product's chosen style as well as thumbnail photos of a smaller size of different photos of the style. The thumbnails are interactive and when clicked update the main image to that thumbnail while highlighting the thumbnail photo on the side to indicate selection. A product's style's photos can be beautifully displayed in this format. It also includes two different views, standard as well as expanded. Products can be zoomed in on and inspected.

Product Information:

The product information sub component displays the product's star rating, category, name, price, slogan, description and features. The information is neatly display along side the image gallery to highlight the product's awesome features.

Style Selector:

The style selector sub component displays the product's different styles. It provides a small thumbnail image that shows an introduction to the style. The thumbnail images are interactive and allow the user to change to another style with a simple click. This interacts with our image gallery as well and updates the style to the user's choosing.

Add to Cart:

The add to cart sub component displays the product's style's availability and allows the user to add the product to their cart or alternatively save the outfit to their favorites, or maybe both! There are also buttons and selection menus for the product's different sizes and the specific size's quantity that are available. If the product is out of stock then the selection menu will display a notification of it being out of stock.