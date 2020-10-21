<template>
  <div id="app">
    <transition name="fade" mode="out-in">
			<router-view/>
		</transition>
  </div>
</template>

<script>
export default {
  
}
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: all .2s ease;
  }
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }
</style>

<style  lang="scss">
	.detail {
        background-color: #fff;
        border-radius: 10px;
        padding: 30px;
	}
	$color: #3A62D7 !important;
	// 按钮 
	.el-button {
		width: 108px !important;
		height: 34px !important;
		padding: 0 !important;
	}
	.el-button--default {
		color: $color;
		border-color: $color;
	}
	.el-button--primary {
		background-color: $color;
		border-color: $color;
		color: #fff;
	}
	// margin-top
	.top-23 {
		margin-top: 23px;
	}
	// 输入框
	.el-input__inner {
		&:focus {
			border-color: $color;
		}
	}
	// .表格
	.table-wrap {
		// margin-top: 23px;
		background-color: #fff;
		border-radius: 10px;
		padding: 0 47px 10px 31px;
		.el-table th.is-leaf {
			border-bottom: 2px solid $color;
			height: 66px;
			font-size: 18px;
			color: #333;
			font-weight: 600;
		}
		.el-table td {
			font-size: 16px;
			color: #666;
			font-weight: 600;
		}
	}
	.table-handle {
		span {
			color: #3A62D7;
			font-size: 16px;
			font-weight: 600;
			cursor: pointer;
			margin-right: 15px;
			&:last-child {
				margin-right: 0;
			}
		}
	}
	// tab切换
	.tabs {
        height: 74px;
        background-color: #fff;  
        border-radius: 10px;
        box-sizing: border-box;
        padding: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
	.el-tabs__item {
		font-weight: 600;
		color: #666;
		font-size: 16px;
	}
	.el-tabs__item:hover {
		color: $color;
	}
	.el-tabs__item.is-active {
		color: $color;
	}
	.el-tabs__nav-wrap::after {
		height: 0;
	}
	.el-tabs__active-bar {
		background-color: $color;
	}
	// form
	.el-form-item__label {
		color: #999;
		font-weight: 600;
	}
	.el-textarea__inner {
		height: 150px;
	}
	.el-select .el-input.is-focus .el-input__inner {
		border-color: $color;
	}
	.el-select .el-input__inner:focus {
		border-color: $color;
	}
	.el-select-dropdown__item.selected {
		color: $color;
	}
	.el-date-table td.today span {
		color: $color;
	}
	.el-time-panel__btn.confirm {
		color: $color;
	}
	.el-switch.is-checked .el-switch__core {
		border-color: $color;
		background-color: $color;
	}
	.el-checkbox__input.is-checked+.el-checkbox__label {
		color: $color;
	}
	.el-checkbox__input.is-checked .el-checkbox__inner {
		border-color: $color;
		background-color: $color;
	}
	.el-checkbox__inner:hover {
		border-color: $color;
	}
	.el-radio__input.is-checked+.el-radio__label {
		color: $color;
	}
	.el-radio__input.is-checked .el-radio__inner {
		border-color: $color;
		background-color: $color;
	}
	.el-radio__inner:hover {
		border-color: $color;
	}
	.el-textarea__inner:focus {
		border-color: $color;
	}
	.form-btn {
		padding: 20px 0;
		button:last-child {
			margin-left: 30px;
		}
	}
	.region{
		position: absolute;
		top: 170px !important;
		left: 300px;
		.el-cascader-panel{
			height: 200px;
		}
	}
</style>
