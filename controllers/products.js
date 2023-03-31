const Product = require("../models/product");

const getAllProducts=async(req,res)=>{
    const { id, name,company,price,colors,image,description,category, featured,sort,select } = req.query;
    const queryObject={};
    if(id)
    {
        queryObject.id=id;
    }
    if(price)
    {
        queryObject.price=price;
    }
    if(description)
    {
        queryObject.description=description;
    }
    if(category)
    {
        queryObject.category=category;
    }
    

    if(company)
    {
        queryObject.company=company;
    }
    if(colors)
    {
        queryObject.colors=colors;
    }
    if(image)
    {
        queryObject.image=image;
    }
    if(featured)
    {
        queryObject.featured=featured;
    }
    if(name)
    {
        queryObject.name={$regex:name,$options:"i"};
    }
    let apiData = Product.find(queryObject);

    if (sort) {
        let sortFix = sort.split(",").join(" ");
        apiData = apiData.sort(sortFix);
     }
     if (select) {
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
      }

      let page = Number(req.query.page) || 1;
      let limit = Number(req.query.limit) || 10;
    
      let skip = (page - 1) * limit;
    
      apiData = apiData.skip(skip).limit(limit);
    
      console.log(queryObject);
    
      const Products = await apiData;
      res.status(200).json({ Products, nbHits: Products.length });
    
    
};
const getAllProductsTesting=async(req,res)=>{
    
     console.log(req.query);

     const myData = await Product.find(req.query).skip(2);

     res.status(200).json({ myData, nbHits: myData.length });
};

module.exports={getAllProducts,getAllProductsTesting};