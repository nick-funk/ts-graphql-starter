const gulp = require("gulp");
const ts = require("gulp-typescript");

const tsProj = ts.createProject("tsconfig.json");

const outDir = "dist";

gulp.task("build", () => {
  return tsProj
    .src()
    .pipe(tsProj())
    .js
      .pipe(
        gulp.dest(outDir)
      );
});

gulp.task("watch", () => {
  gulp.series([ "build" ]);

  gulp.watch([ "src/**/*.ts" ], (cb) => {
    console.log("starting build...");
    gulp.series([ "build" ]);
    cb();
  });
});