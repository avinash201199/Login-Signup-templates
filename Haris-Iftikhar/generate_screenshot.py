"""
generate_screenshot.py

Creates a static PNG representation of the login page (Haris-Iftikhar.png)
This does not run a headless browser; instead it paints the main card using Pillow so it's reproducible without a browser.

Requires: Pillow
Run: python generate_screenshot.py
"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = 'Haris-Iftikhar.png'
W, H = 1200, 800

def load_font(size, bold=False):
    # Try to use a common system font; fallback to default PIL font
    try:
        if os.name == 'nt':
            base = 'C:/Windows/Fonts/seguisb.ttf' if bold else 'C:/Windows/Fonts/seguiui.ttf'
        else:
            base = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
        return ImageFont.truetype(base, size)
    except Exception:
        return ImageFont.load_default()

def draw_card(draw):
    card_w, card_h = 420, 420
    card_x = (W - card_w)//2
    card_y = (H - card_h)//2
    # background
    draw.rectangle([0,0,W,H], fill=(7,20,41))
    # soft radial glow (simple)
    # card
    draw.rounded_rectangle([card_x,card_y,card_x+card_w,card_y+card_h], radius=16, fill=(11,18,32))

    # brand
    font_brand = load_font(22, bold=True)
    draw.text((card_x+28, card_y+20), 'Haris Iftikhar', font=font_brand, fill=(108,140,255))

    # title
    font_h = load_font(28, bold=True)
    draw.text((card_x+28, card_y+54), 'Welcome back', font=font_h, fill=(230,238,248))

    # muted
    font_muted = load_font(14)
    draw.text((card_x+28, card_y+90), 'Sign in to continue to your account', font=font_muted, fill=(154,164,178))

    # fields
    f_x = card_x+28
    cur_y = card_y+130
    label_font = load_font(12)
    input_h = 42
    for label in ['Email','Password']:
        draw.text((f_x, cur_y), label, font=label_font, fill=(154,164,178))
        cur_y += 18
        draw.rounded_rectangle([f_x, cur_y, f_x+card_w-56, cur_y+input_h], radius=8, fill=(18,24,36))
        cur_y += input_h+14

    # button
    btn_y = cur_y
    draw.rounded_rectangle([f_x, btn_y, f_x+card_w-56, btn_y+44], radius=10, fill=(108,140,255))
    btn_font = load_font(16, bold=True)
    bbox = draw.textbbox((0,0), 'Sign in', font=btn_font)
    w_txt = bbox[2] - bbox[0]
    h_txt = bbox[3] - bbox[1]
    draw.text((f_x + ((card_w-56)-w_txt)/2, btn_y+10), 'Sign in', font=btn_font, fill=(6,32,71))

def main():
    img = Image.new('RGB',(W,H),(7,20,41))
    draw = ImageDraw.Draw(img)
    draw_card(draw)
    img.save(OUT)
    print('Wrote', OUT)

if __name__ == '__main__':
    main()
