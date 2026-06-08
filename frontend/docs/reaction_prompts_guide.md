# Hướng dẫn tạo Prompt cho Nhóm Phản ứng với Dung dịch HCl

Tài liệu này tối ưu hóa và cấu trúc lại các prompt tạo ảnh/sprite sheet cho nhóm phản ứng của HCl với các oxit bazơ (**CaO, BaO, Na₂O**), đảm bảo tính đồng bộ hoàn hảo với bộ asset **CaO + Nước** trước đó.

---

## 1. Nguyên tắc thiết kế (Design Guidelines)
Để đảm bảo tính đồng bộ với bộ ảnh CaO + Nước:
- **Phong cách:** Không sử dụng pixel art (do yêu cầu ưu tiên bộ prompt ban đầu). Thay vào đó, sử dụng phong cách **Clean studio cutout, high realism, object-focused render** (cắt phông studio sạch sẽ, tả thực cao, tập trung vào vật thể).
- **Vật thể:** Cốc thủy tinh (glass beaker) được căn giữa, góc nhìn trực diện (front view), nền trắng tinh khiết (pure white background) hoặc giả lập trong suốt.
- **Dung dịch ban đầu:** HCl trong suốt, không màu hoặc có ánh xanh dương nhạt cực nhẹ (pale blue tint), có nhãn giấy dán nhỏ ghi chữ **"HCl"**.
- **Hiệu ứng hóa học:** 
  - Phản ứng tạo ra các muối tan hoàn toàn ($CaCl_2, BaCl_2, NaCl$), do đó dung dịch cuối cùng phải **trong suốt và không màu** (khác với phản ứng của CaO + Nước tạo ra $Ca(OH)_2$ kết tủa trắng/vẩn đục).
  - Phản ứng tỏa nhiệt nên sẽ có bọt khí (bubbles) và hơi nước (steam) xuất hiện, lượng bọt và nhiệt độ giảm dần cho đến khi kết thúc phản ứng.

---

## 2. Prompt cho Base Asset (Cốc chứa HCl - 1 Hình Duy Nhất)

Dưới đây là các phương án thiết kế cho hình nền cốc HCl ban đầu trước khi xảy ra phản ứng.

### Phương án A: Phong cách Tả thực (High Realism Studio Cutout)
*Phương án này đồng bộ về mặt đồ họa với các asset CaO + Nước nguyên bản.*

#### Prompt:
```text
A single transparent glass beaker filled with clear, colorless hydrochloric acid (HCl) solution, isolated object only, centered composition, pure white background, no environment, no laboratory, no table, no extra objects. A small, clean, simple white paper label with the text "HCl" clearly printed on the front of the beaker. The liquid is transparent and has a very subtle, pale blue tint. Realistic glass reflection and refraction, clean studio cutout style, high realism, object-focused render, transparent background appearance.
```

#### Negative Prompt:
```text
background, laboratory, table, bottles, chemistry room, shelves, cinematic room, wooden desk, extra objects, people, hands, dark background, science equipment, decorations, environment, clutter, reflections, multiple containers, pixel art, 3D render, low quality, cartoon, drawing, sketch.
```

### Phương án B: Phong cách Pixel Art (2D Educational Pixel Art)
*Phương án này tương thích với định dạng game 2D cổ điển / pixel art.*

#### Prompt:
```text
Create a reusable 2D pixel art chemistry game asset sprite of a transparent glass beaker containing hydrochloric acid (HCl) solution. The beaker must remain perfectly centered with symmetrical proportions and identical scale suitable for future animation sprite sheets and chemistry reaction sequences. The liquid inside is mostly colorless with an extremely subtle pale blue tint for visual readability. Add a very small simple “HCl” label on the front of the beaker using clean pixel lettering. Style requirements: educational chemistry pixel art, 2D game asset style, front view only, isolated object only, transparent background or pure white background, no environment, no laboratory scene, no table, no extra objects, black pixel outline, clean pixel shading, soft but scientifically realistic colors, consistent top-left lighting, consistent object proportions, clean studio cutout appearance, visually compatible with future reaction animation frames. Technical requirements: 128x128 sprite, centered composition, equal padding around object, sprite-sheet-ready asset, maintain consistent beaker geometry for future animation reuse.
```

#### Negative Prompt:
```text
realistic photo, 3D render, anime style, painterly style, cinematic lighting, background scene, laboratory room, shelves, desk, reflections, extra containers, people, hands, clutter, asymmetrical object, dynamic camera angle, multiple objects, distorted glass, high fantasy colors.
```

---

## 3. Các Sprite Sheet Hoạt ảnh Phản ứng (Reaction Sprite Sheets)

Mỗi phản ứng dưới đây được chia thành các Frame tương ứng với tiến trình phản ứng thực tế. Định dạng sprite sheet ngang từ 3-5 khung hình chuyển động mịn.

### 3.1 Phản ứng: CaO + HCl
*Phương trình:* $CaO + 2HCl \rightarrow CaCl_2 + H_2O$ (Tỏa nhiệt mạnh, đá CaO tan hết tạo dung dịch trong suốt).

````carousel
```text
[FRAME 1 — CaO touches HCl]
IMPORTANT ANIMATION INSTRUCTION:
Create a sprite sheet animation sequence, NOT a single image. Generate 3 to 5 separate animation frames for this scene. Each frame must show small progressive motion changes like a real 2D game animation. Keep the beaker perfectly centered and consistent in every frame. Only animate the water, bubbles, steam, ripples, and CaO movement. Do not change camera angle, object scale, lighting, or composition. Arrange all animation frames horizontally in one sprite sheet. Equal spacing between frames. Transparent or pure white background only. 2D game asset sheet style. Each frame must look like the next step of motion.

A single transparent glass beaker with a small white label "HCl" on it, filled with clear acid solution, isolated object only, centered composition, pure white background. A small white calcium oxide (CaO) stone falling into the liquid. Liquid surface creating small ripples after contact. Tiny bubbles beginning to form around the CaO stone. Realistic liquid physics, ultra detailed bubbles, realistic chemistry reaction, clean studio cutout style, high realism.

Animation frame progression:
Frame 1: CaO stone just touches the liquid surface
Frame 2: Small circular ripples spread outward
Frame 3: Tiny bubbles appear around the stone
Frame 4: Stone sinks slightly lower with more bubbles
Frame 5: Bubble activity increases and ripples become stronger
```
<!-- slide -->
```text
[FRAME 2 — Reaction begins]
IMPORTANT ANIMATION INSTRUCTION:
Create a sprite sheet animation sequence, NOT a single image. Generate 3 to 5 separate animation frames for this scene. Each frame must show progressive motion changes. Keep the beaker perfectly centered and identical in every frame. Only animate bubbling, steam, and liquid movement. Arrange all frames horizontally. Transparent or pure white background only.

A single isolated transparent glass beaker with a small white label "HCl", filled with clear liquid, centered object only, pure white background. The calcium oxide stone underwater starts reacting intensely. Small bubbles rapidly forming around the stone. Thin steam beginning to rise from the liquid surface. The solution remains clear and transparent. Realistic exothermic chemistry reaction, detailed bubbling motion, realistic steam physics, studio cutout style, high realism.

Animation frame progression:
Frame 1: Small bubbles begin forming around the stone
Frame 2: Bubble count increases rapidly
Frame 3: Thin steam begins appearing above the liquid surface
Frame 4: Stone begins to slowly shrink as it dissolves
Frame 5: Surface liquid vibrates slightly from reaction heat
```
<!-- slide -->
```text
[FRAME 3 — Vigorous dissolving and bubbling]
IMPORTANT ANIMATION INSTRUCTION:
Create a horizontal sprite sheet animation with 3 to 5 frames. Do NOT generate one static image. Each frame must contain slightly different motion. Maintain identical beaker position and size in every frame. Only the reaction effects should animate.

A single transparent glass beaker with a small white label "HCl" on it, isolated on pure white background, centered composition. The calcium oxide reaction intensifies, the stone dissolves rapidly. Medium-sized bubbles continuously rising upward from the shrinking stone. Steam increasing above the beaker. Liquid remains transparent and clear. Realistic dissolving motion, detailed liquid simulation, clean studio cutout style, high realism.

Animation frame progression:
Frame 1: Larger bubbles begin appearing from the stone
Frame 2: Liquid starts bubbling moderately
Frame 3: Steam becomes more visible and rises upward
Frame 4: The CaO stone becomes noticeably smaller
Frame 5: Surface vibration increases while the CaO stone continues to dissolve into a clear solution
```
<!-- slide -->
```text
[FRAME 4 — Dissolution near completion]
IMPORTANT ANIMATION INSTRUCTION:
Generate a 2D animation sprite sheet with 5 frames. Do NOT create one image. Each frame must show reaction movement progression. Frames must be aligned horizontally. Consistent beaker position and scale.

A single isolated glass beaker with a small white label "HCl", filled with clear reacting liquid, centered object only, pure white background. The reaction is slowing down as the calcium oxide is almost fully dissolved. Tiny bubbles rising gently. Thin steam fading. The liquid is completely clear and colorless. Ultra realistic liquid simulation, realistic bubble physics, studio cutout style.

Animation frame progression:
Frame 1: Only a tiny piece of CaO stone remains at the bottom
Frame 2: Bubbling activity decreases
Frame 3: Steam becomes very thin and sparse
Frame 4: The tiny stone piece completely disappears
Frame 5: Bubbles almost stop, liquid starts to calm down
```
<!-- slide -->
```text
[FRAME 5 — Reaction completed (Clear Solution)]
IMPORTANT ANIMATION INSTRUCTION:
Generate a sprite sheet animation sequence with 3 to 5 frames. Do not generate a single static render. Keep all frames visually consistent. Only animate the final stabilization.

A single transparent glass beaker with a small white label "HCl", isolated on white background, centered object only. The chemical reaction has fully completed. The liquid is a completely clear, transparent, and still calcium chloride solution. No bubbles. No steam. No sediment at the bottom. Clean studio cutout render, high realism.

Animation frame progression:
Frame 1: Remaining tiny bubbles disappear completely
Frame 2: Last traces of steam fade away
Frame 3: Water surface stabilizes
Frame 4: Liquid becomes perfectly calm and still
Frame 5: Still glass beaker containing clear, colorless solution
```
````

*(Negative Prompt chung cho tất cả các Frame của CaO + HCl:* `background, laboratory, table, bottles, chemistry room, shelves, cinematic room, wooden desk, extra objects, people, hands, dark background, science equipment, decorations, environment, clutter, reflections, multiple containers, single frame, one image only, static pose`*)*

---

### 3.2 Phản ứng: BaO + HCl
*Phương trình:* $BaO + 2HCl \rightarrow BaCl_2 + H_2O$ (Phản ứng tương tự CaO + HCl, tạo dung dịch muối $BaCl_2$ trong suốt).

````carousel
```text
[FRAME 1 — BaO touches HCl]
... (Thay thế từ khóa "CaO" hoặc "calcium oxide" trong prompt 3.1 bằng "BaO" hoặc "barium oxide stone" / "BaO stone") ...
```
<!-- slide -->
```text
[FRAME 2 — Reaction begins]
... (Sử dụng prompt tương đương 3.1, mô tả đá BaO bắt đầu phản ứng tạo bong bóng nhỏ và hơi nước, dung dịch vẫn trong suốt) ...
```
<!-- slide -->
```text
[FRAME 3 — Dissolving process]
... (Mô tả đá BaO tan dần, sủi bọt vừa phải, hơi nước bốc lên, dung dịch trong suốt không màu) ...
```
<!-- slide -->
```text
[FRAME 4 — Dissolution near completion]
... (Đá BaO tiêu biến gần hết, bọt khí giảm dần, dung dịch hoàn toàn trong suốt) ...
```
<!-- slide -->
```text
[FRAME 5 — Reaction completed]
... (Dung dịch muối BaCl₂ hoàn toàn trong suốt, tĩnh lặng, không còn cặn hay bong bóng) ...
```
````

---

### 3.3 Phản ứng: Na₂O + HCl
*Phương trình:* $Na_2O + 2HCl \rightarrow 2NaCl + H_2O$ (Phản ứng xảy ra cực kỳ mãnh liệt, tỏa nhiệt rất mạnh, sủi bọt mạnh và tan rất nhanh thành dung dịch muối ăn $NaCl$ trong suốt).

````carousel
```text
[FRAME 1 — Na2O touches HCl]
IMPORTANT ANIMATION INSTRUCTION:
... (Giống instruct gốc) ...

A single transparent glass beaker with a small white label "HCl", filled with clear acid solution, isolated on pure white background. A small white sodium oxide (Na2O) stone falling into the liquid, touching the surface. Small ripples on the liquid surface. Bubbles begin to form immediately. Realistic liquid physics.

Animation frame progression:
Frame 1: Na2O stone just touches the liquid surface
Frame 2: Small circular ripples spread outward
Frame 3: Bubbles begin to form rapidly around the Na2O stone
Frame 4: Stone sinks slightly with more rapid bubbles
Frame 5: Bubble activity increases and ripples become stronger
```
<!-- slide -->
```text
[FRAME 2 — Violent reaction begins]
A single isolated transparent glass beaker with a small white label "HCl", filled with clear liquid, centered object only, pure white background. The Na2O stone underwater starts reacting violently. Dense bubbles forming rapidly. Thin steam beginning to rise. The liquid remains clear. Exothermic chemistry reaction, detailed bubbling motion, realistic steam physics, studio cutout style, high realism.

Animation frame progression:
Frame 1: Dense bubbles begin forming around the stone
Frame 2: Bubble count increases extremely rapidly
Frame 3: Steam begins appearing above the liquid
Frame 4: Stone starts dissolving very fast, getting smaller
Frame 5: Surface liquid vibrates from the high reaction heat
```
<!-- slide -->
```text
[FRAME 3 — Peak bubbling and steam]
A single transparent glass beaker with a small white label "HCl" on it, isolated on pure white background. The exothermic reaction reaches its peak. The Na2O stone is dissolving very rapidly, releasing a stream of violent bubbles. Thick steam rising from the beaker. Liquid remains transparent and clear. Realistic dissolving motion, detailed liquid simulation, clean studio cutout style, high realism.

Animation frame progression:
Frame 1: Violent bubbling spreads across the beaker
Frame 2: Liquid starts boiling due to reaction heat
Frame 3: Steam becomes thick and highly visible
Frame 4: The Na2O stone is almost completely dissolved
Frame 5: Bubbling remains intense but starts to plateau
```
<!-- slide -->
```text
[FRAME 4 — Dissolution near completion]
A single isolated glass beaker with a small white label "HCl", filled with clear reacting liquid, centered object only, pure white background. The reaction is slowing down as the Na2O is almost fully dissolved. Tiny bubbles rising gently. Thin steam fading. The liquid is completely clear.

Animation frame progression:
Frame 1: Only a tiny piece of Na2O stone remains at the bottom
Frame 2: Bubbling activity decreases
Frame 3: Steam becomes very thin and sparse
Frame 4: The tiny stone piece completely disappears
Frame 5: Bubbles almost stop, liquid starts to calm down
```
<!-- slide -->
```text
[FRAME 5 — Reaction completed (Clear Solution)]
A single transparent glass beaker with a small white label "HCl", isolated on white background, centered object only. The chemical reaction has fully completed. The liquid is a completely clear, transparent, and still sodium chloride (NaCl) solution. No bubbles. No steam. No sediment. Clean studio cutout render, high realism.

Animation frame progression:
Frame 1: Remaining tiny bubbles disappear completely
Frame 2: Last traces of steam fade away
Frame 3: Water surface stabilizes
Frame 4: Liquid becomes perfectly calm and still
Frame 5: Still glass beaker containing clear, colorless solution
```
````
