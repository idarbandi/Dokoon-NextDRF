from django.db import models
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from mptt.models import MPTTModel, TreeForeignKey


class Category(MPTTModel):
    name = models.CharField(
        verbose_name=_("Category Name"),
        help_text=_("Make Sure To Fill It"),
        max_length=255,
        unique=True,
    )
    slug = models.SlugField(verbose_name=_(
        'Category Safe Url'), max_length=255, unique=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE,
                            null=True, blank=True, related_name='children')
    is_active = models.BooleanField(default=True)

    class MPTTMeta:
        order_insertion_by = ['name']

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _('Categories')

    def get_absolute_url(self):
        return reverse("store:category_list", args={"pk": self.pk})

    def __str__(self):
        return self.name


class ProductType(models.Model):
    name = models.CharField(verbose_name=_(
        'Product Name'), help_text=_("Required"), max_length=255)
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Product Type")
        verbose_name_plural = _("Product Types")

    def __str__(self):
        return self.name


class ProductSpecification(models.Model):
    product_type = models.ForeignKey(ProductType, on_delete=models.RESTRICT)
    name = models.CharField(verbose_name=_(
        "Name"), help_text=_("Required"), max_length=255)

    class Meta:
        verbose_name = _("Product Specification")
        verbose_name_plural = _("Product Specification")

        def __str__(self):
            return self.name


class Product(models.Model):
    product_type = models.ForeignKey(ProductType, on_delete=models.RESTRICT)
    category = models.ForeignKey(Category, on_delete=models.RESTRICT)
    title = models.CharField(verbose_name=_(
        "Title"), help_text=_("Required"), max_length=255)
    description = models.TextField(verbose_name=_(
        "Description"), help_text=_("Not Required"), blank=True)
    slug = models.SlugField(max_length=255)
    regular_price = models.DecimalField(
        verbose_name=_("Reqular Prices"),
        help_text=_('Maximum 999.99'),
        error_messages={
            "name": {
                "The Price Must Be Between 0 , 999,99"
            },
        },
        max_digits=5,
        decimal_places=2,
    )
    discount_price = models.DecimalField(
        verbose_name=_("Discount Prices"),
        help_text=_('Maximum 999.99'),
        error_messages={
            "name": {
                "The Discount Must Be Between 0 , 999,99"
            },
        },
        max_digits=5,
        decimal_places=2,
    )
    is_active = models.BooleanField(
        verbose_name=_('Product Visibility'),
        help_text=_('Change Product Visibility'),
        default=True
    )
    created_at = models.DateTimeField(
        _("Created at"), auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(_("Updated at"), auto_now=True)

    class Meta:
        ordering = ("-created_at",)
        verbose_name = _('Product')
        verbose_name_plural = _('Products')

    def get_absolute_url(self):
        return reverse("store:product_detail", args=[self.slug])

    def __str__(self):
        return self.title


class ProductSpecificationValue(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    specification = models.ForeignKey(
        ProductSpecification, on_delete=models.RESTRICT)
    value = models.CharField(
        verbose_name=_("Value"),
        help_text=_("Product Specification Value (Maximum of 255 Words)"),
        max_length=255
    )

    class Meta:
        verbose_name = _('Product Specification Value')
        verbose_name_plural = _('Product Specification Values')


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name=_("product_image"))
    image = models.ImageField(verbose_name=_('image'),
                              help_text=_("Upload a Products Image"),
                              upload_to="images/",
                              default='images/default.png'
                              )
    alt_text = models.CharField(
        verbose_name=_("Image Alernative Text"),
        help_text=_("For The Cause Of Your Project Fill It"),
        max_length=255,
        blank=True, null=True
    )
    is_feature = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True, editable=False)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Product Image")
        verbose_name_plural = _("Product Images")
