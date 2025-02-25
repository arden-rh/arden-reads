<div class="wrapper flex items-baseline justify-center lg:justify-normal px-2 lg:px-0">
	<div class="bg-teal-900 w-1/6 lg:w-1/5 h-16 lg:h-24 left-stand"></div>
	<div class="w-1/5 h-40 lg:h-72 animated-background bg-linear-to-r from-teal-600 to-teal-700"></div>
	<div class="w-1/5 h-60 lg:h-96 animated-background bg-linear-to-r from-teal-400 to-teal-500"></div>
	<div class="w-1/5 h-36 lg:h-64 animated-background bg-linear-to-r from-teal-700 to-teal-800"></div>
	<div class="bg-teal-900 w-1/6 lg:w-1/5 h-16 lg:h-24 right-stand"></div>
</div>

<style>
	.left-stand {
		border-top-left-radius: 100%;
	}

	.right-stand {
		border-top-right-radius: 100%;
	}

	.wrapper {
		width: 100%;
		max-width: 400px;
		height: 100%;
	}

	.animated-background {
		background-size: 400%;

		-webkit-animation: backgroundAnimation 4s ease infinite;
		-moz-animation: backgroundAnimation 4s ease infinite;
		animation: backgroundAnimation 4s ease infinite;
	}

	@keyframes backgroundAnimation {
		0%,
		100% {
			background-position: 0% 50%;
		}

		50% {
			background-position: 100% 50%;
		}
	}
</style>
