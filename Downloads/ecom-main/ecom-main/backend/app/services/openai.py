# import os
# import openai
# from flask import Flask, request, jsonify
# from dotenv import load_dotenv
# from app.modules.teamexp.model import find
# import json
# import re
# import html

# load_dotenv()

# openai.api_key = "YOUR_OPENAI_API_KEY_HERE"

# def strip_code_block(gpt_result: str):
#     return re.sub(r"^```json\n|```$", "", gpt_result.strip())

# def send_to_gpt(keywords_in_title, content, model="gpt-4o-mini", user_role="user"):
#     system_prompt = f"""
# You are an SEO expert with 10+ years of experience. You provide detailed and actionable SEO strategies.
# Requirements for Title: 
# - The title is written based on the content, topic of the old title, and your knowledge of SEO Optimization.
# - The title must be SEO optimized but still retain the important content of the original title.
# - Contains keywords: {keywords_in_title}
# - Minimum length: 100 characters 
# - Maximum length: 130 characters 
# - Don't use characters ':'
# - Do not use product description for write the new title
# Do not add the words: perfect, show now

# Requirements for Description:
# - Maximum length: 399 characters
# - Minimum length: 100 characters
# - Description is html language, beautifull html list, 
# - The description starts with the product title(h3), the middle part is the items in the basic description, the last part is CTA(don't add CTA text),
# -write more readably 
# -Each paragraph must not exceed 399 characters.
# -Add style to these characters ('Please note', 'Care instructions', 'Key features', 'Application', 'Finish', 'Premium printable vinyl', 'Easy peel backing', 'Eco-friendly product', 'Vibrant colors'). If in description has keyword 'Sticker'
# Return result as json can decode by php.
# Return only result.
# Do not contain keywords: download, png, jpeg, digital, Shop Now, High-quality
# """
#     try:
#         response = openai.chat.completions.create(
#             model=model,
#             messages=[
#                 {"role": "system", "content": system_prompt},
#                 {"role": user_role, "content": content}
#             ]
#         )
#         contentBefore = response.choices[0].message.content
#         contentAfter = strip_code_block(contentBefore)
#         result = json.loads(contentAfter)
#         description_html = html.unescape(result["description"])
#         result["description"] = description_html
#         return result
#     except Exception as e:
#         return f"Error when send message to chat GPT: {e}"
    
# def rewriteProduct(productId):
#     try:
#         product = find(productId, 'products')
#         productType = find(product['product_type_id'], 'product_types')
#         productTitle = product['title'].lower()
#         productDesc = product['description'].lower()
#         if "poster" in productTitle:
#             keyword = "wall art, poster unframed"
#         elif "t-shirt" in productTitle:
#             keyword = "Tee, T-shirt"
#         elif "hoodie" in productTitle:
#             keyword = "hoodie"
#         elif "tumbler" in productTitle:
#             keyword = "tumbler"
#         elif "mug" in productTitle:
#             keyword = "mug"
#         elif "sweatshirt" in productTitle:
#             keyword = "sweatshirt"
#         elif "embroidered" in productTitle:
#             keyword = "embroidered"
#         elif "necklace" in productTitle:
#             keyword = "Necklace"
#         elif "bracelet" in productTitle:
#             keyword = "Bracelet"
#         elif "croptop" in productTitle:
#             keyword = "Croptop"
#         elif "sticker" in productTitle:
#             keyword = "Sticker"
#         elif "phone case" in productTitle:
#             keyword = "Phone case"
#         else:
#             keyword = None
#         if keyword is None:
#             return "Keyword is null"
#         else:
#             prom = f"I have a {productType['name']} product that needs to have its title and description rewritten to SEO optimization. Take the role of an expert in writing product content, help me rewrite the content for this {productType['name']}product. Title: {productTitle} Description: {productDesc}"
#             resultViaGPT = send_to_gpt(keyword, prom)
#             return resultViaGPT
#     except Exception as e:
#         return f"Error when rewrite product: {e}"