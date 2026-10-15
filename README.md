# Unit Converter (Length & Weight)

A lightweight, responsive web application for real-time conversion between length units (meters, feet, kilometers) and weight units (kilograms, pounds, grams) built with vanilla **HTML5**, **CSS3**, and **JavaScript**.

---

## 1. Approach

### Architecture: Base Unit Pattern
Instead of writing separate conversion functions for every unit pair (which would require $N \times (N - 1)$ pair functions), all units are normalized against a single standard **Base Unit**:
* **Length Base Unit:** Meter ($1\text{ m}$)
* **Weight Base Unit:** Kilogram ($1\text{ kg}$)

### Mathematical Formula
Any conversion is executed in two steps (or a single combined formula):
1. **Convert to Base Unit:** $\text{inBaseUnit} = \text{Value} \times \text{fromFactor}$
2. **Convert to Target Unit:** $\text{Result} = \frac{\text{inBaseUnit}}{\text{toFactor}}$

$$\text{Result} = \frac{\text{Value} \times \text{fromFactor}}{\text{toFactor}}$$

### Form Handling & Conditional Logic
* **Live Calculation:** The application listens to `input` events on the number field and `change` events on the dropdowns.
* **Compatibility Validation:** Conditional logic checks whether the user is attempting to convert between incompatible categories (e.g., *Length* to *Weight*). If mismatched, a helpful warning is displayed instead of an invalid calculation.

---

## 2. Outcome

* **Live Conversion:** Values update instantly as the user types or selects different units.
* **Support for 6 Common Units:**
  * **Length:** Meters (m), Feet (ft), Kilometers (km)
  * **Weight:** Kilograms (kg), Pounds (lb), Grams (g)
* **One-Click Unit Swap:** Instant reversal of source and target units with smooth rotation animation.
* **Clean Formatting:** Results are formatted using `toFixed(2)` alongside step-by-step formula breakdown.
* **Modern Glassmorphism UI:** Frosted glass effect with floating ambient background orbs and full mobile responsiveness.

---

## 3. Deployment Configuration

Because the application is built entirely with client-side Vanilla HTML, CSS, and JavaScript, it requires **zero build steps** and **zero server dependencies**.

### Option A: GitHub Pages Deployment
1. Initialize Git and push the repository:
   ```bash
   git init
   git add .
   git commit -m "feat: complete unit converter implementation"
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. Navigate to **Settings** > **Pages** in your GitHub repository.
3. Under **Branch**, select `main` and root directory (`/`), then click **Save**.
4. The site is published automatically at `https://<your-username>.github.io/<repo-name>/`.

### Option B: Vercel / Netlify Deployment
* **Vercel:** Run `npx vercel` in the project root and accept the default settings (Framework preset: `Other`).
* **Netlify:** Drag and drop the project folder directly onto the [Netlify Drop](https://app.netlify.com/drop) dashboard.

---

## 4. Rollback Evidence & Strategy

### Rollback Strategy
All code changes are tracked via atomic Git commits. If an issue or regression occurs in production or staging, the project can be rolled back safely and cleanly using standard Git procedures.

### Rollback Commands & Evidence
1. **Inspect Commit History:**
   ```bash
   git log --oneline
   ```
   *Example output:*
   ```text
   a1b2c3d (HEAD -> main) style: update mobile responsiveness and glassmorphism
   e4f5g6h feat: add base unit conversion and input validation
   ```

2. **Safe Rollback (Creating a Revert Commit):**
   To roll back the latest commit without altering past commit history:
   ```bash
   git revert HEAD --no-edit
   git push origin main
   ```

3. **Emergency Reset to Previous Stable Commit:**
   ```bash
   git reset --hard HEAD~1
   # Re-verify and force push if authorized:
   # git push origin main --force
   ```

### Verification Checklist Post-Rollback
* [x] File integrity verified: `index.html`, `style.css`, and `script.js` exist.
* [x] Open `index.html` in browser: Default value `1 Meter` converts to `3.28 ft`.
* [x] Enter `10 Kilograms` $\rightarrow$ correctly outputs `22.05 lb`.
* [x] Test incompatible units (*Meters* to *Kilograms*) $\rightarrow$ error message displays properly.

---

## 5. Assessment Interview Questions & Answers

### Q1: How would you structure conversion factors?
> **Answer:**
> We structure conversion factors using a **Base Unit Dictionary**. Instead of defining separate functions for every possible conversion pair (which scales at $O(N^2)$), each unit stores a single `factor` indicating its ratio to a category base unit ($1\text{ m}$ for length, $1\text{ kg}$ for weight):
> ```javascript
> const units = {
>   meters:     { type: 'length', factor: 1 },
>   feet:       { type: 'length', factor: 0.3048 },
>   kilometers: { type: 'length', factor: 1000 },
>   kilograms:  { type: 'weight', factor: 1 },
>   pounds:     { type: 'weight', factor: 0.45359237 }
> };
> ```
> To convert between any two units of the same type:
> $$\text{Result} = \frac{\text{Value} \times \text{fromFactor}}{\text{toFactor}}$$
> This reduces code complexity from $N \times (N - 1)$ pair functions down to just $N$ factor definitions ($O(N)$ maintenance).

---

### Q2: What does `toFixed` do?
> **Answer:**
> `Number.prototype.toFixed(digits)` formats a number using fixed-point decimal notation.
> 1. **Returns a String:** It returns the formatted number as a string (e.g., `(3.28084).toFixed(2)` returns `"3.28"`).
> 2. **Rounds Decimals:** It rounds up or down according to standard rounding rules at the specified decimal place.
> 3. **Pads with Zeros:** If the number has fewer decimal places than requested, it pads with trailing zeros (e.g., `(5).toFixed(2)` yields `"5.00"`).

---

### Q3: How would you add a new unit to this converter?
> **Answer:**
> Thanks to the base-unit architecture, adding a new unit takes just two simple steps without touching the calculation engine:
>
> 1. **Add the unit factor in `script.js`:**
>    ```javascript
>    inches: { name: 'Inches', symbol: 'in', type: 'length', factor: 0.0254 }
>    ```
> 2. **Add the `<option>` tag in `index.html` inside `<select id="fromUnit">` and `<select id="toUnit">`:**
>    ```html
>    <option value="inches">Inches (in)</option>
>    ```
> The conversion formula, validation checks, and swap functionality automatically support the new unit.
