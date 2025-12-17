# deno-jsr-test-isOdd

## isOdd test package (Deno + JSR)

Un mini framework de test (describe/test/expect/run) et une petite lib `isOdd`/`isEven` en
TypeScript pour Deno, packagée pour JSR.

### Installation / Import

- Avec JSR (après publication) :

```ts
import { describe, expect, run, test } from "jsr:@augustinseg/isodd-test";
import { isEven, isOdd } from "jsr:@augustinseg/isodd-test/isOdd";
```

- En local (dans ce repo) :

```ts
import { describe, expect, run, test } from "./mod.ts";
import { isEven, isOdd } from "./src/isOdd.ts";
```

### Utilisation (exemple)

```ts
import { describe, expect, run, test } from "./mod.ts";

/**
 * OBJECTIF: Démontrer le framework de test
 * params: aucun
 * returned: void
 */
describe("Arithmetic Operations", () => {
  test("should add two numbers correctly", () => {
    const result = 2 + 3;
    expect(result).toBe(5);
  });

  test("should multiply two numbers correctly", () => {
    const result = 4 * 4;
    expect(result).toBe(16);
  });
});

// Exécuter
await run();
```

Voir un usage complet dans `examples/demo.ts`.

### Commandes Deno utiles

```sh
# formater
deno task fmt:write

# lint
deno task lint

# type-check
deno task check

# lancer la démo (exécute les tests du mini framework)
deno task demo
```

### Initialiser un nouveau projet Deno (exemple)

```sh
mkdir my-deno-project && cd my-deno-project
deno init -q
```

### Publication sur JSR

1. S'assurer que `deno.json` contient un `name` valide (ex: `@augustinseg/isodd-test`) et des
   `exports`.
2. Se connecter si nécessaire :

```sh
deno publish --dry-run
# Suivre les instructions de login si demandé
```

3. Publier :

```sh
deno publish
```

Notes:

- JSR calcule un score qualité: documenter les fonctions (JSDoc), fournir `README`, exports, et un
  `deno.json` propre aide à atteindre 100%.
- Versionnement: privilégier les tags Git (ex: `v0.1.0`).

### GitHub Actions

Un workflow Deno est dans `.github/workflows/deno.yml` pour lancer format, lint, type-check et la
démo.

### .gitignore

Un `.gitignore` adapté Deno/Node basique est inclus.
