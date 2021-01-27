const gulp = require("gulp");
const ts = require("gulp-typescript");

const tsProj = ts.createProject("tsconfig.json");

const outDir = "dist";

const build = () => {
  return tsProj
    .src()
    .pipe(tsProj())
    .js
      .pipe(
        gulp.dest(outDir)
      );
}

gulp.task("build", () => {
  return build();
});

gulp.task("doWatch", () => {
  gulp.watch([ "src/**/*.ts" ], gulp.series("build"));
});

gulp.task("watch", 
  gulp.series(
    "build", 
    "doWatch"
  )
);