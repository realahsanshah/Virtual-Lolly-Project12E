const path=require('path');

exports.createPages=async({actions,graphql})=>{
    const data=await graphql(
        `
        query{
            lollies{
                lollies{
                lollyPath
                }
            }
        }
        `
    )

    console.log("data in node",data.data.lollies.lollies);

    data.data.lollies.lollies.forEach(({lollyPath})=>{
        console.log("lollyPath",lollyPath);
        actions.createPage({
            path:`lollies/${lollyPath}`,
            component:path.resolve('./src/templates/lollyTemplate.tsx'),
            context:{
                lollyPath:lollyPath
            }
        })
    })
}