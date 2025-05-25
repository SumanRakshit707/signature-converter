import sys
from PIL import Image
import numpy as np

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

input_path = sys.argv[1]
output_path = sys.argv[2]
color_hex = sys.argv[3]
new_color = hex_to_rgb(color_hex)

img = Image.open(input_path).convert("RGBA")
data = np.array(img)

r, g, b, a = data.T
white_areas = (r > 200) & (g > 200) & (b > 200)
data[..., :-1][~white_areas.T] = new_color
data[..., -1][white_areas.T] = 0

processed_img = Image.fromarray(data)
processed_img.save(output_path)
