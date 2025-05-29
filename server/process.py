#old api
# import sys
# from PIL import Image
# import numpy as np

# def hex_to_rgb(hex_color):
#     hex_color = hex_color.lstrip('#')
#     return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

# input_path = sys.argv[1]
# output_path = sys.argv[2]
# color_hex = sys.argv[3]
# new_color = hex_to_rgb(color_hex)

# img = Image.open(input_path).convert("RGBA")
# data = np.array(img)

# r, g, b, a = data.T
# white_areas = (r > 200) & (g > 200) & (b > 200)
# data[..., :-1][~white_areas.T] = new_color
# data[..., -1][white_areas.T] = 0

# processed_img = Image.fromarray(data)
# processed_img.save(output_path)

#new optimized api
import sys
import os
import cv2
import numpy as np
from PIL import Image

def extract_signature(input_path, output_path, hex_color):
    # Convert hex color to RGB
    hex_color = hex_color.lstrip('#')
    r, g, b = tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

    # Load image
    img = cv2.imread(input_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Preprocessing
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)
    thresh = cv2.adaptiveThreshold(blurred, 255,
                                   cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                   cv2.THRESH_BINARY_INV, 11, 2)

    # Optional: remove small noise
    kernel = np.ones((2, 2), np.uint8)
    morph = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel)

    # Create transparent canvas
    h, w = morph.shape
    transparent = np.zeros((h, w, 4), dtype=np.uint8)

    # Color signature pixels with selected ink color
    transparent[:, :, 0] = r
    transparent[:, :, 1] = g
    transparent[:, :, 2] = b
    transparent[:, :, 3] = morph  # alpha channel from threshold

    # Save image
    Image.fromarray(transparent).save(output_path)

if __name__ == '__main__':
    input_path = sys.argv[1]
    output_path = sys.argv[2]
    hex_color = sys.argv[3]
    extract_signature(input_path, output_path, hex_color)
